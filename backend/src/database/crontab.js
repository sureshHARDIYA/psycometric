const schedule = require('node-schedule');

class CronTab {
  constructor() {
    this.jobs = {};
  }

  scheduleJob(...args) {
    schedule.scheduleJob(...args)
  }

  add(key, ...args) {
    try {
      if (this.jobs[key]) {
        this.jobs[key];
        this.deleteJob(key);
        console.warn(`${key} already existed and was deleted from the manager...`);
      }

      this.jobs[key] = schedule.scheduleJob(key, ...args);
      return this.jobs[key];
    } catch (e) {
      console.error(`crontab: ${key} possibly not valid, job not started...${e.message}`);
    }
  }

  deleteJob(key) {
    try {
      if (this.jobs[key]) {
        this.jobs[key].cancel();
        delete this.jobs[key];
      } else {
        throw new Error(`${key} is not exist`);
      }
    } catch (err) { console.error(`error in trying to stop job: ${key}: ${err}`) }
  }

  start(key) {
    try {
      if (this.jobs[key].running) {
        console.warn(`${key} job already running`);
      } else {
        this.jobs[key].start();
      }
    }catch (err) {
      console.error(`couldn't start job: ${key}: ${err}`);
    }
  }

  stop() {
    try {
      if (! this.jobs[key].running ){
        console.warn(`${key} job already stopped`);
      } else {
        this.jobs[key].cancel();
      }
    } catch(err) {
      console.error(`couldn't stop job: ${key}: ${err}`)
    }
  }

  stopAll() {
    for (key in this.jobs) {
      try {
        this.jobs[key].cancel()
      } catch(err) {
        console.error(`couldn't stop job: ${key}: ${err}`)
      }
    }
  }

  list() {
    if (!Object.keys(this.jobs).length) {
      return `{}`
    }


    return `
      {
        ${Object.entries(this.jobs).map(([key, job]) => `'${key}': Running`).join('\n')}
      }
    `;
  }
}

module.exports = new CronTab();
