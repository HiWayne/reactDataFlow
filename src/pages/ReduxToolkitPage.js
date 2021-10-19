import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setDesc,
  submit,
  query,
  select,
  remove,
} from "reduxToolkitStore/mainSlice";
import Content from "components/Content";

const ReduxToolkitPage = () => {
  const title = useSelector((state) => state.main.title);
  const desc = useSelector((state) => state.main.desc);
  const derivedFromTitle = useSelector((state) => state.main.derivedFromTitle);
  const derivedFromDesc = useSelector((state) => state.main.derivedFromDesc);
  const submitLoading = useSelector((state) => state.main.submitLoading);
  const queryLoading = useSelector((state) => state.main.queryLoading);
  const history = useSelector((state) => state.main.history);
  const currentIndex = useSelector((state) => state.main.currentIndex);
  const dispatch = useDispatch();
  const data = {
    title,
    desc,
    derivedFromTitle,
    derivedFromDesc,
    submitLoading,
    queryLoading,
    history,
    currentIndex,
    setTitle: (data) => dispatch(setTitle(data)),
    setDesc: (data) => dispatch(setDesc(data)),
    select: (data) => dispatch(select(data)),
    query: () => dispatch(query()),
    submit: (data) => dispatch(submit(data)),
    remove: (data) => dispatch(remove(data)),
  };

  return <Content data={data} />;
};

export default ReduxToolkitPage;
