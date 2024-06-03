import "./Loading.css";

type LoadingProps = {
  color?: string;
  message?: string;
};

export const Loading = (props: LoadingProps) => {
  return (
    <div className="loading">
      <div className="loader-container">
        <div
          style={{ borderColor: `${props.color} #0000` }}
          className="loader"
        ></div>
      </div>
      <h2 style={{ color: `${props.color}` }}>
        {props.message || "Loading"}...
      </h2>
    </div>
  );
};
