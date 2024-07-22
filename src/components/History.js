import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const History = () => {
  const [open, setOpen] = useState(false);
  const history = useSelector((state) => state.search.history);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        History
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Search History
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ position: 'absolute', top: 8, right: 20 }}
          >
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {history.length > 0 ? (
              history.map((item, index) => (
                <ListItem
                  key={index}
                >
                  <ListItemText primary={item.description || item.formatted_address || 'No description available'} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No history available" />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default History;