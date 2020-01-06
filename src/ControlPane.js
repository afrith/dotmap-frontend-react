import React from 'react'
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

export default function ControlPane (props) {
  const { dots, onChangeDots = () => {} } = props

  return (
    <div>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>Displayed data</FormLabel>
        <RadioGroup aria-label='Displayed data' name='dots' value={dots} onChange={e => onChangeDots(e.target.value)}>
          <FormControlLabel value='race' control={<Radio />} label='Population group' />
          <FormControlLabel value='lang' control={<Radio />} label='First language' />
          <FormControlLabel value='hhinc' control={<Radio />} label='Household income' />
        </RadioGroup>
      </FormControl>
    </div>
  )
}
