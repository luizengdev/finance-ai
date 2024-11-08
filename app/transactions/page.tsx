import { DataTable } from "@/components/ui/data-table"
import { db } from "@/lib/prisma"
import { transactionColumns } from "./_columns"
import AddTransactionButton from "@/components/add-transaction-button"
import Navbar from "@/components/navbar"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const TransactionsPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect("/")
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  })
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        {/* TABELA */}
        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  )
}

export default TransactionsPage
