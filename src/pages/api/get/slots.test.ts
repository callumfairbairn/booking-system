import handler, { getSlots } from './slots'
import { createMocks } from 'node-mocks-http';
import { testApiHandler } from 'next-test-api-route-handler';


describe('get slots', () => {
  it('returns null', async () => {
    expect(getSlots()).toBeNull()
  })
});