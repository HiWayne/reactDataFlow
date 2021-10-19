import dayjs from "dayjs";
import deleteIcon from "assets/icons/delete.png";
import Loading from "components/Loading";
import * as Styles from "styles/index";

const History = ({
  data,
  handleDelete,
  handleSelect,
  currentIndex,
  title,
  loading,
  ...props
}) => {
  if (Array.isArray(data)) {
    return (
      <ul
        className="rounded-sm overflow-auto bg-gradient-to-r from-indigo-50 to-indigo-100 p-0.5 shadow relative"
        {...props}
      >
        {data.length === 0 && loading ? (
          <Loading position="absolute" />
        ) : (
          <>
            <h3>{title}</h3>
            {data.map((item, index) => (
              <li
                key={item.createTime}
                className={`group p-0.5 ${
                  index === currentIndex ? "animate-blue-twinkling" : "shadow"
                } ${
                  index === currentIndex ? "" : Styles.hoverShadow
                } bg-white rounded-sm cursor-pointer select-none relative ${
                  Styles.transition
                } my-0.5 px-0.5`}
                onClick={() => {
                  if (typeof handleSelect === "function") {
                    handleSelect(index);
                  }
                }}
              >
                <span
                  className={`w-16px h-16px opacity-0 group-hover:opacity-100 absolute top-0.5 right-1 z-10 ${Styles.transition} bg-cover bg-no-repeat bg-center hover:shadow-2xl`}
                  style={{ backgroundImage: `url(${deleteIcon})` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof handleDelete === "function") {
                      handleDelete(index);
                    }
                  }}
                ></span>
                <h5>
                  创建时间:{" "}
                  {dayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")}
                </h5>
                <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                  标题: {item.title}
                </p>
                <p
                  style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordBreak: "break-all",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  描述: {item.desc}
                </p>
              </li>
            ))}
          </>
        )}
      </ul>
    );
  } else {
    return null;
  }
};

export default History;
