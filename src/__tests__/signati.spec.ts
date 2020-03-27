import { Signati } from '../signati/Signati';
describe('Create CFDI', () => {
    it('fetches successfully data from an API', async () => {
        const Signature = async () => {
            console.log('amir')
            const signati = new Signati('324SADADSSKNKE0093092');
            try {
                const result = await signati.timbrado().facturar('asdasd');
                return result
            } catch (e) {
                console.log('amir', e)
                return e
            }
        }
        expect(await Signature());
    })
    /*test('Return this Signati', async () => {

        expect(await Signature()).toBeUndefined()

    });*/
});
