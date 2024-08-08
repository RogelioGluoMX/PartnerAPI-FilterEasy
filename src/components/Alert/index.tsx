import {
  AlertDescription,
  AlertIcon,
  Box,
  Alert as ChakraAlert,
  CloseButton,
  StyleProps,
} from '@chakra-ui/react'

export type AlertStatus = 'info' | 'warning' | 'success' | 'error' | 'loading'
export type AlertVariant = 'subtle' | 'left-accent' | 'top-accent' | 'solid'

export type AlertProps = {
  description: string
  status: AlertStatus
  variant?: AlertVariant
  onClose?: () => void
}

export const Alert = (props: AlertProps & StyleProps) => {
  const { description, status, variant = 'subtle', onClose, ...rest } = props

  return (
    <ChakraAlert status={status} variant={variant} {...rest}>
      <AlertIcon />
      <Box flex={1}>
        <AlertDescription>{description}</AlertDescription>
      </Box>
      {onClose && (
        <CloseButton
          size="sm"
          position="relative"
          right={-1}
          onClick={onClose}
        />
      )}
    </ChakraAlert>
  )
}
