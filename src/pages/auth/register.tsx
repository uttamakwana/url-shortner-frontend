import { registerUser } from "@/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store"
import { useMutation } from "@tanstack/react-query"
import { useState, type FormEvent } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

export const Register = () => {
  const { updateToken } = useUserStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: registerUser,
    onError: (error) => {
      toast.error(error?.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      if(response.data) {
        navigate("/dashboard");
        updateToken(response.data.accessToken);
      }
    }
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ name, email, password })
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h2 className="text-3xl font-semibold text-center text-neutral-800 mb-6">Create Account</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" required />
            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required />
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
            <Button type="submit" className="w-full" disabled={isPending}>Register</Button>
          </form>
          <p className="text-center text-sm text-neutral-500 mt-4">
            Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}