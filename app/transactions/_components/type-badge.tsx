import { Badge } from "@/components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { CircleIcon } from "lucide-react"

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  let badgeClass = ""
  let iconClass = ""
  let text = ""

  switch (transaction.type) {
    case TransactionType.DEPOSIT:
      badgeClass = "bg-blue-800/80 text-blue-500 hover:bg-blue-800"
      iconClass = "fill-blue-500"
      text = "Depósito"
      break
    case TransactionType.EXPENSE:
      badgeClass = "bg-red-800/80 text-red-400 hover:bg-red-800"
      iconClass = "fill-red-400"
      text = "Despesa"
      break
    default:
      badgeClass = "bg-green-800/80 text-green-500 hover:bg-green-800"
      iconClass = "fill-green-500"
      text = "Investimento"
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
