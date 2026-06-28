import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "./Login"
import Signup from "./Signup"

const AuthPage = () => {
  return (
      <div className='flex min-h-[80vh] w-full items-center justify-center'>
        <Tabs className='w-full max-w-md px-10 md:px-0' defaultValue='login'>
          <TabsList className='mb-6' variant='line'>
            <TabsTrigger value='login'>Log In</TabsTrigger>
            <TabsTrigger value='signup'>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <Login />
          </TabsContent>
          <TabsContent value='signup'>
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
  )
}

export default AuthPage
