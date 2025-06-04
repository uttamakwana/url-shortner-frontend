import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "motion/react";
import { loginUser } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "@/store";

export const Login = () => {
  const navigate = useNavigate();
  const { updateUser, updateToken } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.log({ error })
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      console.log({ response })
      if(response.data) {
        updateUser(response.data.user)
        updateToken(response.data.accessToken);
        navigate("/dashboard");
      }
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ email, password })
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div className="w-full max-w-md p-6" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardContent>
            <h2 className="text-3xl font-semibold text-center text-forground mb-6">Login</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
              <Button type="submit" className="w-full" disabled={isPending}>Login</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account? <Link to="/register" className="text-[var(--brand)] hover:underline">Register</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}