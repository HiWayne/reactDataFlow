import { useEffect } from "react";
import { observer, inject } from "mobx-react";
import History from "components/History";

const Content = ({ data }) => {
  const {
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
    select,
    submit,
    remove,
    query,
  } = data;
  const handleTitleInput = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleDescInput = (e) => {
    const value = e.target.value;
    setDesc(value);
  };

  useEffect(() => {
    query();
  }, []);

  return (
    <div className="p-1 flex justify-around items-center">
      <div className="w-300rem">
        <h3>
          标题：<span className="underline">{title}</span>
        </h3>
        <p className="my-0.5">
          描述：<span className="underline">{desc}</span>
        </p>
        <p className="my-0.5">统计标题：{derivedFromTitle}</p>
        <p className="my-0.5">统计描述：{derivedFromDesc}</p>
        <div className="my-0.5 flex items-center">
          <label>修改标题：</label>
          <input className="border" value={title} onChange={handleTitleInput} />
        </div>
        <div className="my-0.5 flex items-center">
          <label>修改描述：</label>
          <textarea
            className="border"
            style={{ marginTop: "20px", width: "300px", height: "100px" }}
            value={desc}
            onChange={handleDescInput}
          />
        </div>
        <div>
          <button
            disabled={submitLoading}
            className={`
          px-0.5 rounded-full text-white ${
            submitLoading ? "bg-gray-300" : "bg-blue-400"
          }`}
            onClick={submit}
          >
            {submitLoading ? "保存中..." : "保存"}
          </button>
        </div>
      </div>
      <History
        data={history}
        handleDelete={remove}
        handleSelect={select}
        currentIndex={currentIndex}
        loading={queryLoading}
        title="历史记录"
        style={{ width: "2.5rem", height: "3rem" }}
      />
    </div>
  );
};

export default inject("main")(observer(Content));
