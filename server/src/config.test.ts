import { config } from './config';

it('returns', () => {
  expect(config()).toMatchInlineSnapshot(`
    Object {
      "appSecret": "foo",
      "pigeonholeServer": "node",
    }
  `);
});
