import { useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import * as mainActionCreators from 'reduxStore/actions/main';
import Content from 'components/Content';

const ReduxPage = ({
  title,
  desc,
  derivedFromTitle,
  derivedFromDesc,
  history,
  currentIndex,
  submitLoading,
  queryLoading,
  setTitle,
  setDesc,
  submit,
  query,
  remove,
  select,
}) => {
  const data = useMemo(
    () => ({
      title,
      desc,
      derivedFromTitle,
      derivedFromDesc,
      history,
      currentIndex,
      submitLoading,
      queryLoading,
      setTitle,
      setDesc,
      submit,
      query,
      remove,
      select,
    }),
    [
      title,
      desc,
      derivedFromTitle,
      derivedFromDesc,
      history,
      currentIndex,
      submitLoading,
      queryLoading,
      setTitle,
      setDesc,
      submit,
      query,
      remove,
      select,
    ],
  );
  return <Content data={data} />;
};

const getTitle = (state) => state.main.title;
const getDesc = (state) => state.main.desc;

const _getDerivedFromTitle = (title) => {
  if (typeof title === 'string') {
    return '字数' + title.length;
  } else {
    console.error(`_getDerivedFromTitle require type is string but got ${typeof title}`);
    return '';
  }
};

const _getDerivedFromDesc = (desc) => {
  if (typeof desc === 'string') {
    return '字数' + desc.length;
  } else {
    console.error(`_getDerivedFromDesc require type is string but got ${typeof desc}`);
    return '';
  }
};

/**
 * 有些数据是通过其他数据计算而来的，称之为"派生数据"，类似vue中的computed属性。
 * 在使用redux时，你可以在selector或reducer的中去计算派生数据。
 * 如果在selector中，reselect库中的createSelector可以让selector在原始数据没有发生变化时不重新计算。
 * 但也可以把派生计算放在reducer中，这样selector只保留简单的映射，也不会带来太高的重复计算代价。
 * 如果是简单的计算逻辑个人更倾向放在reducer，因为reselect有太多模板代码，同时业务逻辑分散可能不利于维护；
 * 如果面对复杂的派生计算，把逻辑放在selector可以减少维护各种状态关系的心智负担，reducer只需要关心核心状态的变更就可以。
 */
const getDerivedFromTitle = createSelector([getTitle], _getDerivedFromTitle);

const getDerivedFromDesc = createSelector([getDesc], _getDerivedFromDesc);

const mapStateToProps = (state) => ({
  title: state.main.title,
  desc: state.main.desc,
  derivedFromTitle: getDerivedFromTitle(state),
  derivedFromDesc: getDerivedFromDesc(state),
  history: state.main.history,
  currentIndex: state.main.currentIndex,
  submitLoading: state.main.submitLoading,
  queryLoading: state.main.queryLoading,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(mainActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage);
