import React, { memo } from 'react'
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Divider, Typography, Box } from '@material-ui/core'
import themeColours from './themeColours'

const dotsetInfo = {
  race: {
    label: 'people',
    density: { 5: '5,000', 6: '2,500', 7: '1,000', 8: '500', 9: '250', 10: '100', 11: '50', 12: '25', 13: '10' },
    note: 'From self-identification in Census 2011.'
  },
  lang: {
    label: 'people',
    density: { 5: '5,000', 6: '2,500', 7: '1,000', 8: '500', 9: '250', 10: '100', 11: '50', 12: '25', 13: '10' },
    note: 'First language from Census 2011. Note that some 800,000 people living in institutional settings were not asked about their languages and are not included here.'
  },
  hhinc: {
    label: 'households',
    density: { 5: '2,500', 6: '1,000', 7: '500', 8: '250', 9: '100', 10: '50', 11: '25', 12: '10', 13: '5' },
    note: 'Annual household income from Census 2011. Note that some 800,000 people living in institutional settings are not included in household statistics.'
  }
}

const LegendTable = memo(({ colours }) => (
  <table>
    <tbody>
      {colours.map(({ colour, label }) => (
        <tr key={label}>
          <td style={{ width: 30, height: 20, backgroundColor: colour }} />
          <td>{label}</td>
        </tr>
      ))}
    </tbody>
  </table>
))

const DoubleLegendTable = memo(({ colours }) => {
  const pairs = []

  colours.forEach((val, idx) => {
    const newIdx = Math.floor(idx / 2)
    if (!pairs[newIdx]) pairs[newIdx] = []
    pairs[newIdx][idx % 2] = val
  })

  console.log(pairs)

  return (
    <table>
      <tbody>
        {pairs.map(pair => (
          <tr key={pair[0].label}>
            <td style={{ width: 30, height: 20, backgroundColor: pair[0].colour }} />
            <td style={{ paddingRight: '1rem' }}>{pair[0].label}</td>
            {pair[1] && (
              <>
                <td style={{ width: 30, height: 20, backgroundColor: pair[1].colour }} />
                <td>{pair[1].label}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export default function ControlPane (props) {
  const { dots, onChangeDots = () => {}, bg, onChangeBg = () => {}, zoom } = props

  const scaleZoom = Math.min(Math.max(Math.floor(zoom), 5), 13)

  return (
    <div>
      <FormControl component='fieldset' margin='dense'>
        <FormLabel component='legend'>Displayed data</FormLabel>
        <RadioGroup aria-label='Displayed data' name='dots' value={dots} onChange={e => onChangeDots(e.target.value)}>
          <FormControlLabel value='race' control={<Radio size='small' />} label='Population group' />
          <FormControlLabel value='lang' control={<Radio size='small' />} label='First language' />
          <FormControlLabel value='hhinc' control={<Radio size='small' />} label='Household income' />
        </RadioGroup>
      </FormControl>

      <Divider />

      <FormControl component='fieldset' margin='dense'>
        <FormLabel component='legend'>Background</FormLabel>
        <RadioGroup aria-label='Background' name='bg' value={bg} onChange={e => onChangeBg(e.target.value)}>
          <FormControlLabel value='street' control={<Radio size='small' />} label='Map' />
          <FormControlLabel value='aerial' control={<Radio size='small' />} label='Aerial photo' />
        </RadioGroup>
      </FormControl>

      <Divider />

      <Box mt={1}>
        <Typography variant='h6'>Legend</Typography>
        <Typography variant='body1' component='div'>
          1 dot = {dotsetInfo[dots].density[scaleZoom]} {dotsetInfo[dots].label}
        </Typography>
        <Box my={1}>
          <Typography variant='body2' component='div'>
            {dots === 'lang' ? <DoubleLegendTable colours={themeColours[dots]} /> : <LegendTable colours={themeColours[dots]} />}
          </Typography>
        </Box>
        <Typography variant='body2' component='div'>
          <p>{dotsetInfo[dots].note}</p>
          <p><em>Note: dots are randomly distributed across census areas.</em></p>
        </Typography>
      </Box>
    </div>
  )
}
