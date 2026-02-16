import React, { useState } from "react";
import { logIn } from "../service/auth.service";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }: any) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>()

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await logIn(form);

    if (typeof res === "string") {
      localStorage.setItem("access_token", res);
      onLogin();
      navigate("/dashboard");
    }

    setValidationErrors({
      username: res?.Username || [],
      password: res?.Password || [],
    });
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md card">
          <div className="mb-8 px-8 py-2 bg-slate-100 text-center">
            <span>Sign in to your dashboard</span>
          </div>

          <div className="px-8 py-6">
            <form className="space-y-5" onSubmit={login}>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent ${validationErrors?.username ? "border-red-500" : "border-slate-300"}`}
                />
                {validationErrors?.username &&
                  validationErrors.username.map((err: any, idx: any) => (
                    <small key={idx} className="text-red-500 block">
                      {err}
                    </small>
                  ))}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded border transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent ${validationErrors?.password ? "border-red-500" : "border-slate-300"}`}
                />
                {validationErrors?.password &&
                  validationErrors.password.map((err, idx) => (
                    <small key={idx} className="text-red-500 block">
                      {err}
                    </small>
                  ))}
              </div>

              <button
                type="submit"
                className="py-2 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                <span>SIGN IN</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
