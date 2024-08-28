import { TextField } from "@mui/material"

type Props = {
  name: string
  type: string
  label:string
}
const CustomizedInput = ({name,type,label}:Props) => {
  return (
      <TextField InputLabelProps={{style:{color:'white'}}} inputProps={{style: {width:'400px',fontSize:20,borderRadius:10,color:'white'}}} name={name} label={label} type={type}>

      </TextField>
  )
}

export default CustomizedInput
