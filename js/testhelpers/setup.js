import Path from 'path';
import AppModulePath from 'app-module-path';

// Adds the root project path as the default import path
AppModulePath.addPath(Path.resolve(__dirname, '../../'));
