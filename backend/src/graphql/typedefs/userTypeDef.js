const userTypeDef=` 
  type User {
     name:String
     email:String
     phoneNumber:String
  }
  
 

  type Query {
    check:String
  }

  type Mutation {
    register(name:String,email:String,phoneNumber:String):User
  }
    
`

module.exports ={userTypeDef} 