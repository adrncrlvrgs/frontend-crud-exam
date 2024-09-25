import { useState } from "react";

const useDelete = () => {
   const [userDelete, setUserDelete] = useState(null);
   const handleDelete = (userId) => setUserDelete(userId);

   return {
      userDelete,
      handleDelete,
      setUserDelete
   }
}

export default useDelete;