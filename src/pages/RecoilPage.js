import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "dayjs";
import * as mainState from "recoilStore/main";
import { fetchSubmit, fetchQuery, fetchDelete } from "api/main";
import Content from "components/Content";

const RECOIL = "recoil";

const RecoilPage = () => {
  const [title, setTitle] = useRecoilState(mainState.titleState);
  const [desc, setDesc] = useRecoilState(mainState.descState);
  const derivedFromTitle = useRecoilValue(mainState.derivedFromTitleState);
  const derivedFromDesc = useRecoilValue(mainState.derivedFromDescState);
  const [history, setHistory] = useRecoilState(mainState.historyState);
  const [currentIndex, setCurrentIndex] = useRecoilState(
    mainState.currentIndexState
  );
  const [submitLoading, setSubmitLoading] = useRecoilState(
    mainState.submitLoadingState
  );
  const [queryLoading, setQueryLoading] = useRecoilState(
    mainState.queryLoadingState
  );

  const query = useCallback(async () => {
    setQueryLoading(true);
    try {
      const response = await fetchQuery(RECOIL);
      if (response) {
        setHistory(response);
      }
    } finally {
      setQueryLoading(false);
    }
  }, [setQueryLoading, setHistory]);

  const submit = useCallback(async () => {
    setSubmitLoading(true);
    try {
      const params = {
        title,
        desc,
        createTime: dayjs(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const response = await fetchSubmit(params, RECOIL);
      if (response) {
        const newHistory = [...history, params];
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
      }
    } finally {
      setSubmitLoading(false);
    }
  }, [title, desc, history, setHistory, setCurrentIndex, setSubmitLoading]);

  const remove = useCallback(
    async (index) => {
      const params = { index };
      const response = await fetchDelete(params, RECOIL);
      if (response) {
        const newHistory = history.slice();
        newHistory.splice(index, 1);
        setHistory(newHistory);
        if (currentIndex === index) {
          if (currentIndex === history.length - 1) {
            const newCurrentIndex =
              currentIndex === 0 ? null : currentIndex - 1;
            setCurrentIndex(newCurrentIndex);
            const { title = "", desc = "" } = newHistory[newCurrentIndex] || {};
            setTitle(title);
            setDesc(desc);
          } else {
            const { title = "", desc = "" } = newHistory[currentIndex] || {};
            setTitle(title);
            setDesc(desc);
          }
        } else if (index < currentIndex) {
          const newCurrentIndex = currentIndex - 1;
          setCurrentIndex(newCurrentIndex);
          const { title = "", desc = "" } = newHistory[newCurrentIndex] || {};
          setTitle(title);
          setDesc(desc);
        }
      }
    },
    [history, currentIndex, setCurrentIndex, setTitle, setDesc, setHistory]
  );

  const select = useCallback(
    (index) => {
      if (currentIndex === index) {
        return;
      }
      setCurrentIndex(index);
      const { title = "", desc = "" } = history[index] || {};
      setTitle(title);
      setDesc(desc);
    },
    [currentIndex, history, setTitle, setDesc, setCurrentIndex]
  );

  const data = {
    title,
    desc,
    derivedFromTitle,
    derivedFromDesc,
    submitLoading,
    queryLoading,
    history,
    currentIndex,
    setTitle,
    setDesc,
    submit,
    query,
    remove,
    select,
  };

  return <Content data={data} />;
};

export default RecoilPage;
