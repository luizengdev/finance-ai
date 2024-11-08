"use server"

import { db } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client"
import { upsertTransactionSchema } from "@/actions/upsert-transaction/schema"
import { revalidatePath } from "next/cache"

interface UpsertTransaction {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransaction) => {
  upsertTransactionSchema.parse(params)
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  await db.transaction.upsert({
    create: { ...params, userId },
    update: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  })
  revalidatePath("/transactions")
}
