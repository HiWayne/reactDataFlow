/**
 * @question 小鸡1个月可以生1颗蛋，蛋3个月可以孵出小鸡（假设忽略小鸡成熟时间、小鸡不会死亡、每只小鸡都会生蛋）。现有1只小鸡1个月后即将下蛋，请问12个月后，共有多少只小鸡？
 * @require 通过代码，以面向对象的方式解答这个问题
 */

/**
 * @ideas
 * 1. 所有事件都是以月为粒度的，所以可以把1月作为检查每个事件的时钟周期
 */

const TIME_LIMIT = 12;

class TimeManager {
  // 可理解为初始时间发生在1月份（1月1号），相比于0更容易代入生活中便于理解
  currentMonths = 1;
  // currentMonths会在13时终止，其实是明年的1月1号，即过了12个月
  remainingTime = 0;
  // 入参：时间限制为几个月
  constructor(timeLimit = 12) {
    this.remainingTime = timeLimit;
  }
  // 消费时间的方法，每调用一次相当于时间度过1个月
  consumeTime(time) {
    if (this.remainingTime > 0 && typeof time === 'number') {
      this.currentMonths += time;
      this.remainingTime -= time;
    } else {
      this.currentMonths++;
      this.remainingTime--;
    }
  }
}

class Chicken {
  // 出生日期
  birthday = null;
  // 下蛋周期
  createEggTime = 1;
  // 上次下蛋时间
  lastCreateEggTime = null;
  // 累计生蛋数量
  hasCreatedEggsCount = 0;
  // 入参：出生月份
  constructor(birthday) {
    if (typeof birthday !== 'number') {
      throw new Error('小鸡必须有生日');
    }
    this.birthday = birthday;
    this.lastCreateEggTime = birthday;
  }
  // 小鸡下蛋
  createEgg(birthday) {
    // 当前时间比上次下蛋时间过去1个月即可下蛋
    if (timeManager.currentMonths - this.lastCreateEggTime === this.createEggTime) {
      allEggs.push(new Egg(birthday));
      this.lastCreateEggTime = timeManager.currentMonths;
      this.hasCreatedEggsCount++;
    }
  }
}

class Egg {
  // 生蛋日期
  birthday = null;
  // 孵蛋周期
  createChickenTime = 3;
  // 入参：下蛋月份
  constructor(birthday) {
    if (typeof birthday !== 'number') {
      throw new Error('鸡蛋必须有生日');
    }
    this.birthday = birthday;
  }
  // 孵化出小鸡
  createChicken(birthday) {
    // 当前时间比蛋生下的时间过去3个月即可孵出小鸡
    if (timeManager.currentMonths - this.birthday === this.createChickenTime) {
      allChicken.push(new Chicken(birthday));
      // 鸡蛋孵化后就不存在鸡蛋了
      const index = allEggs.findIndex((egg) => egg === this);
      allEggs.splice(index, 1);
    }
  }
}

const timeManager = new TimeManager(TIME_LIMIT);

// 第一只小鸡
const firstChicken = new Chicken(timeManager.currentMonths);

// 所有小鸡
const allChicken = [firstChicken];

// 所有鸡蛋
const allEggs = [];

while (timeManager.remainingTime > 0) {
  // 在12个月内，每次循环时间度过1个月
  timeManager.consumeTime();
  const chickenLength = allChicken.length;
  const eggLength = allEggs.length;
  // 每个月都检查小鸡会不会下蛋、鸡蛋会不会孵鸡
  for (let i = 0; i < chickenLength; i++) {
    allChicken[i].createEgg(timeManager.currentMonths);
  }
  // 鸡蛋孵化会被销毁，所以要倒序遍历，否则会少遍历一半
  for (let j = eggLength - 1; j >= 0; j--) {
    allEggs[j].createChicken(timeManager.currentMonths);
  }
}

console.log(allChicken);
console.log(`${TIME_LIMIT}个月后总共有小鸡${allChicken.length}只`);
console.log('--------------------');
console.log(allEggs);
console.log(`${TIME_LIMIT}个月后还剩下${allEggs.length}个蛋来不及孵化`);
