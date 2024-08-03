import { useForm } from "react-hook-form";
import "./style.scss";
import { Link } from "react-router-dom";

type LoginFormSchema = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormSchema>();

  function handleSubmitForm(data: LoginFormSchema) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="content">
          <label className="label">E-mail</label>
          <input className="input" type="text" {...register("email")} />
          <br />

          <label className="label">Senha</label>
          <input className="input" type="text" {...register("password")} />
          <div className="actions">
            <Link to="/client">
              <button className="btn" type="submit">
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </form>
      <div>
        <a className="link-register" href="/register">
          Clique aqui para criar uma conta
        </a>
      </div>
    </>
  );
}
