import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div>
      Данной страницы не существует, <Link to="/"><b>вернуться на главную</b></Link>
    </div>
  );
};

export default ErrorPage;
