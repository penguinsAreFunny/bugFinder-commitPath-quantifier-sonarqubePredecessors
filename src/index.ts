import {quantifierContainer} from "bugFinder-framework-defaultContainer";
import {BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES} from "./TYPES";
import {Cache, RAMCache} from "./sonarQubePredecessorsQuantifier/cache";

export * from "./TYPES"
export * from "./sonarQubePredecessorsQuantifier"

quantifierContainer.bind<Cache>(BUGFINDER_COMMITPATH_QUANTIFIER_SONARQUBEPREDECESSORS_TYPES.cache).to(RAMCache)