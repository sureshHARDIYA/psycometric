const moment = require('moment');
const _get = require('lodash/get');
const schedule = require('node-schedule');
const { Expo } = require('expo-server-sdk');
const MongooseRepository = require('./mongooseRepository');
const MongooseQueryUtils = require('../utils/mongooseQueryUtils');
// const AuditLogRepository = require('./auditLogRepository');
const Reminder = require('../models/reminder');
const Notification = require('../models/notification');
const Questionnaire = require('../models/questionnaire');
const manager = require('../crontab');

const expo = new Expo();

const SCHEDULE_TIME = process.env.SCHEDULE_TIME || "[0 0]";

const parseTime = (frequence, date) => {
  switch (frequence) {
    case 'MONTHLY': return date.format(`${SCHEDULE_TIME} D [* *]`);
    case 'BIWEEKLY': return date.format(`${SCHEDULE_TIME} [*] [*] [*/2]`);
    default: return date.format(`${SCHEDULE_TIME} [*] [*] ddd`);
  }
}

class NotificationRepository {
  static async create(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Notification.createCollection();
    }
    return await Notification.findOneAndUpdate({ token: data.token }, data, { upsert: true, new: true });
  }

  static async destroy(id, options) {
    await MongooseRepository.wrapWithSessionIfExists(
      Notification.deleteOne({ _id: id }),
      options,
    );

    this.delete(id);
  }

  static async count(filter, options) {
    return MongooseRepository.wrapWithSessionIfExists(
      Notification.countDocuments(filter),
      options,
    );
  }

  static async findAndCountAll(
    { filter, limit, offset, orderBy } = {
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let criteria = {};

    if (filter) {
      if (filter.id) {
        criteria = {
          ...criteria,
          _id: MongooseQueryUtils.uuid(filter.id),
        };
      }

      if (filter.user) {
        criteria = {
          ...criteria,
          user: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.user,
            ),
            $options: 'i',
          },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteria = {
            ...criteria,
            createdAt: {
              ...criteria.createdAt,
              $gte: start,
            },
          };
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteria = {
            ...criteria,
            createdAt: { ...criteria.createdAt, $lte: end },
          };
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;

    const rows = await Notification.find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort);
    const count = await Notification.countDocuments(criteria);

    return { rows, count };
  }

  static list() {
    return manager.list();
  }

  static async delete(id) {
    manager.deleteJob(id)
    console.log('JOB LIST:', manager.list());
  }

  static async schedule(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Notification.createCollection();
    }
    const reminderKey = data.id;
    const date = moment(data.schedule)
    const task = manager.add(reminderKey, parseTime(data.frequency, date), () => this.pushNotification(reminderKey, options), null, date.toDate())
    task && console.log(`[Reminder] ${data.title}: ${task.running ? "Running" : "Stopped"} at ${task.cronTime.source}`)
  }

  static async pushNotification(id, options) {
    if (MongooseRepository.getSession(options)) {
      await Notification.createCollection();
    }

    try {
      const data = await Reminder.findById(id).populate('questionnaire')

      const audienceList = await Notification.getTokens(data.audience, data.audienceList)

      for (const audience of audienceList) {
        const pushToken = audience.token;

        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
        }

        const userId = _get(audience, 'user._id');
        const userSchedule = moment(_get(audience, 'user.notification') || new Date());
        const date = moment();

        date.set('second', 10);
        date.set('hour', userSchedule.get('hour'));
        date.set('minute', userSchedule.get('minute'));

        const message = {
          to: pushToken,
          sound: 'default',
          title: data.name,
          body: 'Test on questionnaire is scheduled',
          data: {
            id: data.id,
            title: data.name,
            type: 'Questionnaire',
          }
        }

        console.log(`Scheduled push notification to ${userId} at ${date.toDate()}`)
        schedule.scheduleJob(date.toDate(), () => {
          console.log(`Send push notification to ${userId} at ${date.toDate()}`)
          // // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
          this.sendNotification(message)
        })
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }


  static async scheduleQuestionnaire(data, options) {
    if (MongooseRepository.getSession(options)) {
      await Notification.createCollection();
    }
    const questionnaireKey = data.id;
    const date = moment(data.schedule)
    const task = manager.add(questionnaireKey, parseTime(data.frequency, date), () => this.pushQuestionnaireNotification(questionnaireKey, options), null, date.toDate())
    task && console.log(`[Questionnaire] ${data.name}: ${task.running ? "Running" : "Stopped"} at ${task.cronTime.source}`)
  }


  static async pushQuestionnaireNotification(id, options) {
    if (MongooseRepository.getSession(options)) {
      await Notification.createCollection();
    }

    try {
      const data = await Questionnaire.findById(id)

      const audienceList = await Notification.getTokens(data.audience, data.audienceList)

      for (const audience of audienceList) {
        const pushToken = audience.token;

        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(`Push token ${pushToken} is not a valid Expo push token`);
          continue;
        }

        const userId = _get(audience, 'user._id');
        const userSchedule = moment(_get(audience, 'user.notification') || new Date());
        const date = moment();

        date.set('second', 10);
        date.set('hour', userSchedule.get('hour'));
        date.set('minute', userSchedule.get('minute'));

        const message = {
          to: pushToken,
          sound: 'default',
          title: data.name,
          body: 'Test on questionnaire is scheduled',
          data: {
            id: data.id,
            title: data.name,
            type: 'Questionnaire',
          }
        }

        console.log(`Scheduled push notification to ${userId} at ${date.toDate()}`)
        schedule.scheduleJob(date.toDate(), () => {
          console.log(`Send push notification to ${userId} at ${date.toDate()}`)
          // // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
          this.sendNotification(message)
        })
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  static async sendNotification(message) {
    const tickets = [];
    const [chunk] = expo.chunkPushNotifications([message]);

    if (chunk) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    const receiptIds = [];
    for (const ticket of tickets) {
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    for (const chunk of receiptIdChunks) {
      try {
        const receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        for (const receiptId in receipts) {
          const { status, message, details } = receipts[receiptId];
          if (status === 'ok') {
            continue;
          } else if (status === 'error') {
            console.error(`There was an error sending a notification: ${message}`);
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = NotificationRepository;
