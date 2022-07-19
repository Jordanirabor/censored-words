import { CensorWords } from './censor-words';

describe('censor-words', () => {
  it('builds', () => {
    expect(new CensorWords()).toBeTruthy();
  });

  it('masks out a single keywords', () => {
    const component = new CensorWords();
    component.value = 'quincy';
    component.txtfile = 'quincy';
    expect(component.censor()).toEqual('XXXX');
  });

  it('masks out - case insensitive', () => {
    const component = new CensorWords();
    component.value = 'james';
    component.txtfile = 'James';
    expect(component.censor()).toEqual('XXXX');
  });

  it('masks out space delimited keyword', () => {
    const component = new CensorWords();
    component.value = 'Hello world "Boston Red Sox"';
    component.txtfile = 'Welcome to the world, it is a fun place, hello. you are also welcome to eat at Boston Red Sox';
    expect(component.censor()).toEqual('Welcome to the XXXX, it is a fun place, XXXX. you are also welcome to eat at XXXX');
  });

  it('masks out comma delimited keyword', () => {
    const component = new CensorWords();
    component.value = "'Pepperoni Pizza', beer, you're";
    component.txtfile = "Have you ever had Pepperoni Pizza? You're missing if you haven't, it's great with beer!";
    expect(component.censor()).toEqual("Have you ever had XXXX? XXXX missing if you haven't, it's great with XXXX!");
  });

  it('masks out single quotes', () => {
    const component = new CensorWords();
    component.value = "'hey', 'do', 'cars'";
    component.txtfile = 'do you want to be friends? you have some pretty nice cars';
    expect(component.censor()).toEqual('XXXX you want to be friends? you have some pretty nice XXXX');
  });

  it('masks out double quotes', () => {
    const component = new CensorWords();
    component.value = '"down", "tree"';
    component.txtfile = 'please don\'t let me down was what Oliver Tree said';
    expect(component.censor()).toEqual('please don\'t let me XXXX was what Oliver XXXX said');
  });
});
