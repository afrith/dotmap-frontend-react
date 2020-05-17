import React from 'react'
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Divider } from '@material-ui/core'

export default function ControlPane (props) {
  const { dots, onChangeDots = () => {}, bg, onChangeBg = () => {} } = props

  return (
    <div>
      <FormControl component='fieldset' margin='normal'>
        <FormLabel component='legend'>Displayed data</FormLabel>
        <RadioGroup aria-label='Displayed data' name='dots' value={dots} onChange={e => onChangeDots(e.target.value)}>
          <FormControlLabel value='race' control={<Radio />} label='Population group' />
          <FormControlLabel value='lang' control={<Radio />} label='First language' />
          <FormControlLabel value='hhinc' control={<Radio />} label='Household income' />
        </RadioGroup>
      </FormControl>

      <Divider />

      <FormControl component='fieldset' margin='normal'>
        <FormLabel component='legend'>Background</FormLabel>
        <RadioGroup aria-label='Background' name='bg' value={bg} onChange={e => onChangeBg(e.target.value)}>
          <FormControlLabel value='street' control={<Radio />} label='Map' />
          <FormControlLabel value='aerial' control={<Radio />} label='Aerial photo' />
        </RadioGroup>
      </FormControl>
    </div>
  )
}
