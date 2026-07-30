---
type: Namespace
header: Engine/Core/Args.h
source: Engine/Core/Args.cpp
namespace: Copper
summary: Command line arguments wrapper passed to the current running executable. Does not include the executable path.
---

## Functions

| Name                                    | Description        |
|-----------------------------------------|--------------------|
| void Setup(uint32 argc, char* argv[]) | Parses the command line arguments. Internal, gets called almost immediately at startup, DO NOT USE. |
| uint32 Count() | Returns the number of arguments. |
| std::string& Get(uint32 index) | Returns the argument at the provided index. |
| const fs::path& ProjectPath() | Only when CU_EDITOR is defined, returns the project to open, if one was provided. |
