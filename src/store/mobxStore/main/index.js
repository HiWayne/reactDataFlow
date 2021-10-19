import { fetchSubmit, fetchDelete, fetchQuery } from 'api/main';
import { makeAutoObservable, reaction, observable, action, computed } from 'mobx';

const MOBX = 'mobx';

class Main {
  constructor() {
    makeAutoObservable(this, {
      title: observable,
      desc: observable,
      derivedFromTitle: computed,
      derivedFromDesc: computed,
      submitLoading: observable,
      queryLoading: observable,
      history: observable,
      currentIndex: observable,
      setTitle: action,
      setDesc: action,
      setSubmitLoading: action,
      setQueryLoading: action,
      setHistory: action,
      deleteHistory: action,
      select: action,
    });
  }

  title = 'mobx';

  desc = 'mobx是一个通过监听数据改变来触发订阅的数据流管理库。通过mobx-react，可作为react等视图框架的状态管理库';

  submitLoading = false;

  queryLoading = false;

  history = [];

  currentIndex = null;

  setTitle = (newTitle) => {
    this.title = newTitle;
  };

  setDesc = (newDesc) => {
    this.desc = newDesc;
  };

  setSubmitLoading = (newLoadingStatus) => {
    this.submitLoading = newLoadingStatus;
  };

  setQueryLoading = (newLoadingStatus) => {
    this.queryLoading = newLoadingStatus;
  };

  addHistory = (newHistory) => {
    this.history.push(newHistory);
  };

  deleteHistory = (history) => {
    if (typeof history === 'number') {
      this.history.splice(history, 1);
    } else {
      const index = this.history.findIndex((data) => data === history);
      if (typeof index === 'number') {
        this.history.splice(index, 1);
      }
    }
  };

  // 由title计算而来的状态
  get derivedFromTitle() {
    if (typeof this.title === 'string') {
      return '字数' + this.title.length;
    } else {
      console.error(`derivedFromTitle require type is string but got ${typeof this.title}`);
      return '';
    }
  }

  // 由desc计算而来的状态
  get derivedFromDesc() {
    if (typeof this.desc === 'string') {
      return '字数' + this.desc.length;
    } else {
      console.error(`derivedFromDesc require type is string but got ${typeof this.desc}`);
      return '';
    }
  }

  submit = () => {
    const params = {
      title: this.title,
      desc: this.desc,
      createTime: new Date().getTime(),
    };
    this.setSubmitLoading(true);
    fetchSubmit(params, MOBX)
      .then(
        action((data) => {
          if (data) {
            this.currentIndex = this.history.length;
            this.addHistory(params);
          }
        }),
      )
      .finally(() => {
        this.setSubmitLoading(false);
      });
  };

  remove = (index) => {
    const params = { index };
    fetchDelete(params, MOBX)
      .then(
        action((data) => {
          if (data) {
            this.deleteHistory(index);
            if (this.currentIndex === index) {
              if (this.history.length - 1 === index) {
                if (this.currentIndex > 0) {
                  this.currentIndex--;
                } else {
                  this.currentIndex = null;
                }
              } else {
                this.updateData(index);
              }
            } else if (this.currentIndex > index) {
              this.currentIndex--;
            }
          }
        }),
      )
      .finally(() => {});
  };

  select = (index) => {
    if (typeof index === 'number') {
      this.currentIndex = index;
    }
  };

  query = () => {
    this.setQueryLoading(true);
    fetchQuery(MOBX)
      .then(
        action((history) => {
          this.setHistory(history);
        }),
      )
      .catch(
        action(() => {
          this.setHistory([]);
        }),
      )
      .finally(() => {
        this.setQueryLoading(false);
      });
  };

  setHistory = (history) => {
    this.history = history;
  };

  updateData = (index) => {
    const data = main.history[index];
    if (data) {
      this.setTitle(data.title);
      this.setDesc(data.desc);
    } else {
      this.clearData();
    }
  };

  clearData = () => {
    this.setTitle('');
    this.setDesc('');
  };
}

const main = new Main();

reaction(
  () => main.currentIndex,
  (index) => {
    main.updateData(index);
  },
);

export default main;
