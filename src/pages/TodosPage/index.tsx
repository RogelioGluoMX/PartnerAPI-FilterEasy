import { useAuthenticator } from '@aws-amplify/ui-react'
import {
  Button,
  Container,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { generateClient } from 'aws-amplify/data'
import { useEffect, useState } from 'react'
import type { Schema } from '../../../amplify/data/resource'

const client = generateClient<Schema>()

export const TodosPage = () => {
  const { user, signOut } = useAuthenticator()
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([])

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    })
  }, [])

  function createTodo() {
    client.models.Todo.create({ content: window.prompt('Todo content') })
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <Container>
      <Heading>Hello {user?.signInDetails?.loginId}</Heading>
      <Heading as="h3" size={'md'}>
        My to-dos
      </Heading>
      <Button onClick={createTodo}>+ new</Button>
      <UnorderedList>
        {todos.map((todo) => (
          <ListItem key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </ListItem>
        ))}
      </UnorderedList>
      <Button onClick={signOut} variant="link" colorScheme="secondary">
        Sign out
      </Button>
    </Container>
  )
}
