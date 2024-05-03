import { describe, expect, it, test } from 'vitest'
import { diffInDays } from './diff-in-days'

describe('diffInDays()', () => {
  describe('shoud return a positive number when firstDate is bigger than secondDate', () => {
    it('should return 2 days', () => {
      const firstDate = new Date('2000-01-03')
      const secondDate = new Date('2000-01-01')
      expect(diffInDays(firstDate, secondDate)).toBe(2)
    })
  })

  describe('shoud return a negative number when firstDate is less than secondDate', () => {
    it('should return -3 days of difference', () => {
      const firstDate = new Date('1999-12-31')
      const secondDate = new Date('2000-01-03')
      expect(diffInDays(firstDate, secondDate)).toBe(-3)
    })
  })
})
