import path from 'path';
import YAML from 'yamljs';
import { resolveRefs } from 'json-refs';

const multiFileSwaggerLoad = (mainYamlFileLocation: string) => {
  const mainYamlFileContent = YAML.load(mainYamlFileLocation);

  const options = {
    location: mainYamlFileLocation,
    loaderOptions: {
      processContent: (res: any, callback: any) => {
        callback(undefined, YAML.parse(res.text));
      },
    },
  };

  return resolveRefs(mainYamlFileContent, options).then(
    results => results.resolved,
    err => console.error(err.stack)
  );
};

export const readSwaggerFile = (indexFilePath = path.resolve(process.cwd(), 'docs', 'index.yaml')) => {
  return multiFileSwaggerLoad(indexFilePath);
};
