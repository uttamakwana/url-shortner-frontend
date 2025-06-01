import { Button } from "@/components/ui/button"
import { LogIn, Sparkles, UserPlus } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

export const Landing = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} className="absolute inset-0 [background-size:20px_20px] [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <motion.div
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-neutral-900 mb-4 flex items-center justify-center gap-2">
          <Sparkles className="text-purple-500 h-8 w-8" />
          Shortify
        </h1>
        <p className="text-lg text-neutral-600 mb-6">
          Effortlessly shorten your links, track click analytics, and share with style. Simple, sleek, and secure.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <Link to="/login">
            <Button variant="outline" className="flex gap-2 items-center">
              <LogIn className="h-4 w-4" /> Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="flex gap-2 items-center">
              <UserPlus className="h-4 w-4" /> Register
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
