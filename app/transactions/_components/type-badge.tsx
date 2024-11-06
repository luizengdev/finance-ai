import { Badge } from "@/components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { CircleIcon } from "lucide-react"
import { TRANSACTION_TYPE_OPTIONS } from "@/constants/transactions"

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  const typeOption = TRANSACTION_TYPE_OPTIONS.find(
    (option) => option.value === transaction.type,
  )

  if (!typeOption) {
    return null
  }

  let badgeClass = ""
  let iconClass = ""
  let text = ""

  switch (typeOption.value) {
    case TransactionType.DEPOSIT:
      badgeClass = "bg-blue-800/80 text-blue-500 hover:bg-blue-800"
      iconClass = "fill-blue-500"
      text = typeOption.label
      break
    case TransactionType.EXPENSE:
      badgeClass = "bg-red-800/80 text-red-400 hover:bg-red-800"
      iconClass = "fill-red-400"
      text = typeOption.label
      break
    default:
      badgeClass = "bg-green-800/80 text-green-500 hover:bg-green-800"
      iconClass = "fill-green-500"
      text = typeOption.label
      break
  }

  return (
    <Badge className={`${badgeClass} font-bold`}>
      <CircleIcon className={`mr-2 ${iconClass}`} size={10} />
      {text}
    </Badge>
  )
}

export default TransactionTypeBadge
