export interface course {
    _id:string,
      title: string;
      description: string;
      price: number;
      image: string;
      published: boolean;
      adminId: string;
      name: string;
    }
    
    
    export interface user extends Document{
      _id?:string,
      email: string,
      password: string,
      purchasedCourses:course[],
      cart:course[]
    }