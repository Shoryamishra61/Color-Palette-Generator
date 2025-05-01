import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaTrash, FaDownload, FaUpload, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Container = styled.div`
  background: var(--cardBackground);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
`;

const Title = styled.h2`
  color: var(--primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;

  svg {
    font-size: 1.2rem;
  }
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PaletteCard = styled(motion.div)`
  background: var(--cardBackground);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ColorStrip = styled.div`
  display: flex;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  border: 1px solid var(--border);
  position: relative;
`;

const ColorBlock = styled.div`
  flex: 1;
  background: ${props => props.color};
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: scaleY(1.1);
    z-index: 1;
  }

  &:after {
    content: '${props => props.color}';
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    white-space: nowrap;
    z-index: 10;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const PaletteName = styled.h3`
  color: var(--text);
  margin: 0.75rem 0;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1rem;
  }
`;

const ActionButtonGroup = styled(ButtonGroup)`
  margin: 1.5rem 0;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const FileInput = styled.input`
  display: none;
`;

const EditButton = styled(Button)`
  background: ${props => props.theme.accent1};
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.cardBackground};
  padding: 1.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  border: 1px solid ${props => props.theme.border};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--text);
  padding: 2rem;
  background: var(--background);
  border-radius: 8px;
  border: 1px dashed var(--border);
  margin: 1rem 0;
`;

const SavedPalettes = ({ currentPalette, onLoadPalette }) => {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [editingPalette, setEditingPalette] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadSavedPalettes();
  }, []);

  const loadSavedPalettes = () => {
    try {
      const saved = localStorage.getItem('colorPalettes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSavedPalettes(parsed);
        } else {
          throw new Error('Invalid saved palettes format');
        }
      }
    } catch (error) {
      console.error('Error loading saved palettes:', error);
      toast.error('Error loading saved palettes');
    }
  };

  const saveCurrentPalette = () => {
    if (currentPalette.length === 0) {
      toast.error('No colors to save');
      return;
    }

    const name = prompt('Enter a name for this palette:');
    if (!name) return;

    if (name.length < 2 || name.length > 30) {
      toast.error('Name must be between 2 and 30 characters');
      return;
    }

    const newPalette = {
      id: Date.now(),
      name,
      colors: [...currentPalette],
      date: new Date().toISOString()
    };

    try {
      const updatedPalettes = [...savedPalettes, newPalette];
      setSavedPalettes(updatedPalettes);
      localStorage.setItem('colorPalettes', JSON.stringify(updatedPalettes));
      toast.success('Palette saved successfully!');
    } catch (error) {
      console.error('Error saving palette:', error);
      toast.error('Error saving palette');
    }
  };

  const deletePalette = (id) => {
    if (window.confirm('Are you sure you want to delete this palette?')) {
      try {
        const updatedPalettes = savedPalettes.filter(p => p.id !== id);
        setSavedPalettes(updatedPalettes);
        localStorage.setItem('colorPalettes', JSON.stringify(updatedPalettes));
        toast.success('Palette deleted successfully!');
      } catch (error) {
        console.error('Error deleting palette:', error);
        toast.error('Error deleting palette');
      }
    }
  };

  const editPalette = (palette) => {
    setEditingPalette(palette);
    setNewName(palette.name);
  };

  const saveEdit = () => {
    if (!editingPalette || !newName) return;

    if (newName.length < 2 || newName.length > 30) {
      toast.error('Name must be between 2 and 30 characters');
      return;
    }

    try {
      const updatedPalettes = savedPalettes.map(p => 
        p.id === editingPalette.id ? { ...p, name: newName } : p
      );
      setSavedPalettes(updatedPalettes);
      localStorage.setItem('colorPalettes', JSON.stringify(updatedPalettes));
      setEditingPalette(null);
      toast.success('Palette renamed successfully!');
    } catch (error) {
      console.error('Error editing palette:', error);
      toast.error('Error editing palette');
    }
  };

  const exportPalettes = () => {
    if (savedPalettes.length === 0) {
      toast.error('No palettes to export');
      return;
    }

    try {
      const data = JSON.stringify(savedPalettes, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `color-palettes-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Palettes exported successfully!');
    } catch (error) {
      console.error('Error exporting palettes:', error);
      toast.error('Error exporting palettes');
    }
  };

  const importPalettes = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPalettes = JSON.parse(e.target.result);
        if (!Array.isArray(importedPalettes)) {
          throw new Error('Invalid file format');
        }

        // Validate each palette
        const validPalettes = importedPalettes.filter(palette => 
          palette.id && 
          palette.name && 
          Array.isArray(palette.colors) && 
          palette.colors.length > 0
        );

        if (validPalettes.length === 0) {
          throw new Error('No valid palettes found in file');
        }

        const updatedPalettes = [...savedPalettes, ...validPalettes];
        setSavedPalettes(updatedPalettes);
        localStorage.setItem('colorPalettes', JSON.stringify(updatedPalettes));
        toast.success(`Successfully imported ${validPalettes.length} palettes!`);
      } catch (error) {
        console.error('Error importing palettes:', error);
        toast.error('Invalid file format or corrupted data');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Container>
      <Title>
        <FaSave /> Saved Palettes
      </Title>
      
      <ActionButtonGroup>
        <Button onClick={saveCurrentPalette}>
          <FaSave /> Save Current
        </Button>
        <Button onClick={exportPalettes} disabled={savedPalettes.length === 0}>
          <FaDownload /> Export All
        </Button>
        <Button as="label">
          <FaUpload /> Import
          <FileInput type="file" accept=".json" onChange={importPalettes} />
        </Button>
      </ActionButtonGroup>

      {savedPalettes.length === 0 ? (
        <EmptyState>
          No saved palettes yet. Create and save your first palette!
        </EmptyState>
      ) : (
        <PaletteGrid>
          <AnimatePresence>
            {savedPalettes.map(palette => (
              <PaletteCard
                key={palette.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ColorStrip>
                  {palette.colors.map((color, index) => (
                    <ColorBlock key={index} color={color} />
                  ))}
                </ColorStrip>
                <PaletteName>{palette.name}</PaletteName>
                <ButtonGroup>
                  <Button onClick={() => onLoadPalette(palette.colors)}>
                    Load
                  </Button>
                  <EditButton onClick={() => editPalette(palette)}>
                    <FaEdit />
                  </EditButton>
                  <Button onClick={() => deletePalette(palette.id)}>
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </PaletteCard>
            ))}
          </AnimatePresence>
        </PaletteGrid>
      )}

      <AnimatePresence>
        {editingPalette && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingPalette(null)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3>Rename Palette</h3>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
                maxLength={30}
              />
              <ButtonGroup>
                <Button onClick={saveEdit}>Save</Button>
                <Button onClick={() => setEditingPalette(null)}>Cancel</Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default SavedPalettes; 