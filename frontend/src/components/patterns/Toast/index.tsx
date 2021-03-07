import { useToasts } from 'react-toast-notifications'

interface NewToastProps {
  mensage: string,
  myType: any,
}

const Toast = (
) => {

  const { addToast } = useToasts()


  function addNewToast({mensage, myType} : NewToastProps){
    addToast(mensage, {appearance: myType, autoDismiss: true})
  }

  return {
    addNewToast
  }
}


/*
  Possíveis aparencias
  'error' | 'info' | 'success' | 'warning';

  Para sumir sozinho
  autoDismiss: true,

*/

export default Toast