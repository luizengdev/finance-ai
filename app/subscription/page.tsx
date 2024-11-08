import Navbar from "@/components/navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect("/")
  }
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default SubscriptionPage
