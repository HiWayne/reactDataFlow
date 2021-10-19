import { observer, inject } from 'mobx-react';
import Content from 'components/Content';

const MobxPage = ({ main }) => {
  const data = {
    title: main.title,
    desc: main.desc,
    derivedFromTitle: main.derivedFromTitle,
    derivedFromDesc: main.derivedFromDesc,
    submitLoading: main.submitLoading,
    queryLoading: main.queryLoading,
    history: main.history,
    currentIndex: main.currentIndex,
    setTitle: main.setTitle,
    setDesc: main.setDesc,
    select: main.select,
    submit: main.submit,
    remove: main.remove,
    query: main.query,
  };
  return <Content data={data} />;
};

export default inject('main')(observer(MobxPage));
