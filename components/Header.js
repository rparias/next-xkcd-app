import { Navbar, Text } from '@nextui-org/react'

export const Header = () => {
  return (
    <header>
      <Navbar isBordered variant='static'>
        <Navbar.Brand>
          <Text small b color="inherit">next<Text weight='bold'>xkcd</Text></Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link isActive href="#">Home</Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Search</Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </header>
  )
}