import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export const SearchBar = ({
  value,
  onChange,
  onClear
}: SearchBarProps) => {
  return (
    <Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: 600, mb: 4 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search cities..."
        inputProps={{ 'aria-label': 'search cities' }}
        value={value}
        onChange={onChange}
      />
      <IconButton
        type="button"
        sx={{ p: '16px' }}
        aria-label="search"
        onClick={() => value && onClear()}
      >
        {value ? <CloseIcon /> : <SearchIcon />}
      </IconButton>
    </Paper>
  )
}
