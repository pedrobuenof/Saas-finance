import { Badge } from "@/app/_components/ui/badge"
import { Transaction, TransactionType } from "@prisma/client"
import { CircleIcon } from "lucide-react"

interface TransactionTypeBadgeProps {
  transaction: Transaction
}

const TransactionTypeBadge = ({transaction}: TransactionTypeBadgeProps) => {
  if (transaction.type == TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="fill-primary mr-2" size={12}/>
        Depósito
      </Badge>
    )
  }

  if (transaction.type == TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:bg-muted">
        <CircleIcon className="fill-danger mr-2" size={12}/>
        Despesa
      </Badge>
    )
  }

  return (
    <Badge className="bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="fill-white mr-2" size={12}/>
      Investimento
    </Badge>
  )
}
 
export default TransactionTypeBadge;