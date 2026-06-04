import { useQuery } from '@tanstack/react-query'
import {
  getAlerts, getPastAlerts, getEvents, getNews,
  getServices, getPointsOfInterest,
  getRestaurants, getAccommodations, getMarketItems,
} from './api'

export function useAlerts(initialData) {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
    initialData: initialData !== undefined ? initialData : undefined,
  })
}

export function usePastAlerts() {
  return useQuery({
    queryKey: ['alerts', 'past'],
    queryFn: getPastAlerts,
  })
}

export function useEvents(initialData) {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    initialData: initialData !== undefined ? initialData : undefined,
  })
}

export function useNews(initialData) {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    initialData: initialData !== undefined ? initialData : undefined,
  })
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  })
}

export function usePointsOfInterest() {
  return useQuery({
    queryKey: ['points-of-interest'],
    queryFn: getPointsOfInterest,
  })
}

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  })
}

export function useAccommodations() {
  return useQuery({
    queryKey: ['accommodations'],
    queryFn: getAccommodations,
  })
}

export function useMarketItems() {
  return useQuery({
    queryKey: ['market-items'],
    queryFn: getMarketItems,
  })
}
