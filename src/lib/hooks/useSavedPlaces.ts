'use client';
import { useState, useEffect } from 'react';

export interface SavedPlace {
  id: string; // The query/postcode
  displayName: string;
  savedAt: number;
}

export function useSavedPlaces() {
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('propwise-saved-places');
      if (stored) {
        setSavedPlaces(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved places', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const savePlacesToStorage = (places: SavedPlace[]) => {
    try {
      localStorage.setItem('propwise-saved-places', JSON.stringify(places));
      setSavedPlaces(places);
    } catch (e) {
      console.error('Failed to save places', e);
    }
  };

  const addPlace = (id: string, displayName: string) => {
    const existing = savedPlaces.filter(p => p.id !== id);
    const newPlace: SavedPlace = {
      id,
      displayName,
      savedAt: Date.now()
    };
    // Prepend the new place
    savePlacesToStorage([newPlace, ...existing]);
  };

  const removePlace = (id: string) => {
    savePlacesToStorage(savedPlaces.filter(p => p.id !== id));
  };

  const isSaved = (id: string) => {
    return savedPlaces.some(p => p.id === id);
  };

  return {
    savedPlaces,
    isLoaded,
    addPlace,
    removePlace,
    isSaved
  };
}
