import { newE2EPage } from '@stencil/core/testing';

describe('censor-words', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<censor-words></censor-words>');
    const element = await page.find('censor-words');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();
    await page.setContent('<censor-words></censor-words>');
    const component = await page.find('censor-words');


    const element = await page.find('censor-words >>> label');
    expect(element.textContent).toEqual(`Enter keywords and phrases to be masked`);


    component.setProperty('value', 'donuts')
    component.setProperty('txtfile', 'pasta')
    // await page.waitForChanges()
    // expect(component.censor()).toEqual('XXXX')






    // component.setProperty('first', 'James');





    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James`);
    // component.setProperty('last', 'Quincy');
    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);
    // component.setProperty('middle', 'Earl');
    // await page.waitForChanges();
    // expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
