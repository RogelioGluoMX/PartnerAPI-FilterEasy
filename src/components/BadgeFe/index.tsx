import { Badge, BadgeProps } from '@chakra-ui/react'
import { type Filters } from '../WavesFilters'

export const BadgeFE = ({
  status,
  ...rest
}: BadgeProps & { status: Filters['status'] }) => {
  const isAvailable = status === 'Available'

  return (
    <Badge
      colorScheme={isAvailable ? 'orange' : 'secondary'}
      color={isAvailable ? 'orange.800' : 'secondary.500'}
      textTransform="none"
      {...rest}
    >
      {status}
    </Badge>
  )
}
