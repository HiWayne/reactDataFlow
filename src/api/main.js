// 模拟请求
export const fetchSubmit = (params, namespace) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataString = window.localStorage.getItem(`${namespace}-store`);
      if (dataString) {
        try {
          const data = JSON.parse(dataString);
          data.push(params);
          window.localStorage.setItem(
            `${namespace}-store`,
            JSON.stringify(data)
          );
        } catch {
          reject(false);
        }
      } else {
        const data = [params];
        window.localStorage.setItem(`${namespace}-store`, JSON.stringify(data));
      }
      resolve(true);
    }, 600);
  });

export const fetchDelete = (params, namespace) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataString = window.localStorage.getItem(`${namespace}-store`);
      if (dataString) {
        try {
          const data = JSON.parse(dataString);
          const { index } = params;
          if (typeof index === "number") {
            data.splice(index, 1);
            window.localStorage.setItem(
              `${namespace}-store`,
              JSON.stringify(data)
            );
          } else {
            reject(false);
          }
        } catch {
          reject(false);
        }
      }
      resolve(true);
    }, 200);
  });

export const fetchQuery = (namespace) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataString = window.localStorage.getItem(`${namespace}-store`);
      if (dataString) {
        try {
          const data = JSON.parse(dataString);
          resolve(data);
        } catch {
          reject(false);
        }
      } else {
        resolve([]);
      }
    }, 700);
  });
