"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/components/ui/UiComponents.tsx":
/*!********************************************!*\
  !*** ./src/components/ui/UiComponents.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Button: function() { return /* binding */ Button; },\n/* harmony export */   Input: function() { return /* binding */ Input; },\n/* harmony export */   Modal: function() { return /* binding */ Modal; },\n/* harmony export */   Select: function() { return /* binding */ Select; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Button = (param)=>{\n    let { children, ...props } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n        ...props,\n        style: {\n            padding: \"10px\",\n            margin: \"5px\",\n            cursor: \"pointer\"\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 4,\n        columnNumber: 3\n    }, undefined);\n};\n_c = Button;\nconst Input = (param)=>{\n    let { label, error, ...props } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            margin: \"10px 0\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: label\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 9,\n                columnNumber: 5\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                ...props,\n                style: {\n                    display: \"block\",\n                    width: \"100%\",\n                    padding: \"5px\"\n                }\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 10,\n                columnNumber: 5\n            }, undefined),\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                style: {\n                    color: \"red\"\n                },\n                children: error\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 11,\n                columnNumber: 15\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 8,\n        columnNumber: 3\n    }, undefined);\n};\n_c1 = Input;\nconst Select = (param)=>{\n    let { label, options, error, value, onChange, name, required } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            margin: \"10px 0\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                children: label\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                name: name,\n                value: value,\n                onChange: onChange,\n                style: {\n                    display: \"block\",\n                    width: \"100%\",\n                    padding: \"5px\"\n                },\n                required: required,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                        value: \"\",\n                        children: \"Seleccione una opci\\xf3n\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 9\n                    }, undefined),\n                    options.map((option)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: option.value,\n                            children: option.label\n                        }, option.value, false, {\n                            fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                            lineNumber: 35,\n                            columnNumber: 11\n                        }, undefined))\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, undefined),\n            error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                style: {\n                    color: \"red\"\n                },\n                children: error\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                lineNumber: 40,\n                columnNumber: 17\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, undefined);\n};\n_c2 = Select;\nconst Modal = (param)=>{\n    let { isOpen, onClose, children } = param;\n    if (!isOpen) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            position: \"fixed\",\n            top: 0,\n            left: 0,\n            width: \"100%\",\n            height: \"100%\",\n            background: \"rgba(0,0,0,0.5)\",\n            display: \"flex\",\n            justifyContent: \"center\",\n            alignItems: \"flex-start\",\n            overflow: \"auto\",\n            padding: \"20px 0\"\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            style: {\n                background: \"white\",\n                padding: \"20px\",\n                borderRadius: \"5px\",\n                maxWidth: \"90%\",\n                maxHeight: \"90%\",\n                overflow: \"auto\",\n                position: \"relative\"\n            },\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    onClick: onClose,\n                    style: {\n                        position: \"absolute\",\n                        top: \"10px\",\n                        right: \"10px\",\n                        background: \"none\",\n                        border: \"none\",\n                        fontSize: \"18px\",\n                        cursor: \"pointer\"\n                    },\n                    children: \"\\xd7\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                    lineNumber: 69,\n                    columnNumber: 11\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    style: {\n                        marginTop: \"20px\"\n                    },\n                    children: children\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n                    lineNumber: 83,\n                    columnNumber: 11\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n            lineNumber: 60,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\doctorcelweb\\\\doctorcelweb\\\\src\\\\components\\\\ui\\\\UiComponents.tsx\",\n        lineNumber: 47,\n        columnNumber: 7\n    }, undefined);\n};\n_c3 = Modal;\nvar _c, _c1, _c2, _c3;\n$RefreshReg$(_c, \"Button\");\n$RefreshReg$(_c1, \"Input\");\n$RefreshReg$(_c2, \"Select\");\n$RefreshReg$(_c3, \"Modal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3VpL1VpQ29tcG9uZW50cy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBMEI7QUFFbkIsTUFBTUMsU0FBa0U7UUFBQyxFQUFFQyxRQUFRLEVBQUUsR0FBR0MsT0FBTzt5QkFDcEcsOERBQUNDO1FBQVEsR0FBR0QsS0FBSztRQUFFRSxPQUFPO1lBQUVDLFNBQVM7WUFBUUMsUUFBUTtZQUFPQyxRQUFRO1FBQVU7a0JBQUlOOzs7Ozs7RUFDbEY7S0FGV0Q7QUFJTixNQUFNUSxRQUFtRztRQUFDLEVBQUVDLEtBQUssRUFBRUMsS0FBSyxFQUFFLEdBQUdSLE9BQU87eUJBQ3pJLDhEQUFDUztRQUFJUCxPQUFPO1lBQUVFLFFBQVE7UUFBUzs7MEJBQzdCLDhEQUFDRzswQkFBT0E7Ozs7OzswQkFDUiw4REFBQ0c7Z0JBQU8sR0FBR1YsS0FBSztnQkFBRUUsT0FBTztvQkFBRVMsU0FBUztvQkFBU0MsT0FBTztvQkFBUVQsU0FBUztnQkFBTTs7Ozs7O1lBQzFFSyx1QkFBUyw4REFBQ0s7Z0JBQUtYLE9BQU87b0JBQUVZLE9BQU87Z0JBQU07MEJBQUlOOzs7Ozs7Ozs7Ozs7RUFFNUM7TUFOV0Y7QUFRTixNQUFNUyxTQVFOO1FBQUMsRUFBRVIsS0FBSyxFQUFFUyxPQUFPLEVBQUVSLEtBQUssRUFBRVMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsUUFBUSxFQUFFO3lCQUM5RCw4REFBQ1g7UUFBSVAsT0FBTztZQUFFRSxRQUFRO1FBQVM7OzBCQUM3Qiw4REFBQ0c7MEJBQU9BOzs7Ozs7MEJBQ1IsOERBQUNjO2dCQUNDRixNQUFNQTtnQkFDTkYsT0FBT0E7Z0JBQ1BDLFVBQVVBO2dCQUNWaEIsT0FBTztvQkFBRVMsU0FBUztvQkFBU0MsT0FBTztvQkFBUVQsU0FBUztnQkFBTTtnQkFDekRpQixVQUFVQTs7a0NBRVYsOERBQUNFO3dCQUFPTCxPQUFNO2tDQUFHOzs7Ozs7b0JBQ2hCRCxRQUFRTyxHQUFHLENBQUNELENBQUFBLHVCQUNYLDhEQUFDQTs0QkFBMEJMLE9BQU9LLE9BQU9MLEtBQUs7c0NBQzNDSyxPQUFPZixLQUFLOzJCQURGZSxPQUFPTCxLQUFLOzs7Ozs7Ozs7OztZQUs1QlQsdUJBQVMsOERBQUNLO2dCQUFLWCxPQUFPO29CQUFFWSxPQUFPO2dCQUFNOzBCQUFJTjs7Ozs7Ozs7Ozs7O0VBRTVDO01BM0JTTztBQTZCTixNQUFNUyxRQUF1RjtRQUFDLEVBQUVDLE1BQU0sRUFBRUMsT0FBTyxFQUFFM0IsUUFBUSxFQUFFO0lBQzlILElBQUksQ0FBQzBCLFFBQVEsT0FBTztJQUNwQixxQkFDRSw4REFBQ2hCO1FBQUlQLE9BQU87WUFDVnlCLFVBQVU7WUFDVkMsS0FBSztZQUNMQyxNQUFNO1lBQ05qQixPQUFPO1lBQ1BrQixRQUFRO1lBQ1JDLFlBQVk7WUFDWnBCLFNBQVM7WUFDVHFCLGdCQUFnQjtZQUNoQkMsWUFBWTtZQUNaQyxVQUFVO1lBQ1YvQixTQUFTO1FBQ1g7a0JBQ0UsNEVBQUNNO1lBQUlQLE9BQU87Z0JBQ1Y2QixZQUFZO2dCQUNaNUIsU0FBUztnQkFDVGdDLGNBQWM7Z0JBQ2RDLFVBQVU7Z0JBQ1ZDLFdBQVc7Z0JBQ1hILFVBQVU7Z0JBQ1ZQLFVBQVU7WUFDWjs7OEJBQ0UsOERBQUMxQjtvQkFDQ3FDLFNBQVNaO29CQUNUeEIsT0FBTzt3QkFDTHlCLFVBQVU7d0JBQ1ZDLEtBQUs7d0JBQ0xXLE9BQU87d0JBQ1BSLFlBQVk7d0JBQ1pTLFFBQVE7d0JBQ1JDLFVBQVU7d0JBQ1ZwQyxRQUFRO29CQUNWOzhCQUNEOzs7Ozs7OEJBR0QsOERBQUNJO29CQUFJUCxPQUFPO3dCQUFFd0MsV0FBVztvQkFBTzs4QkFDN0IzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLWCxFQUFFO01BN0NTeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvdWkvVWlDb21wb25lbnRzLnRzeD9iM2E5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uOiBSZWFjdC5GQzxSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4+ID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IChcclxuICA8YnV0dG9uIHsuLi5wcm9wc30gc3R5bGU9e3sgcGFkZGluZzogJzEwcHgnLCBtYXJnaW46ICc1cHgnLCBjdXJzb3I6ICdwb2ludGVyJyB9fT57Y2hpbGRyZW59PC9idXR0b24+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgSW5wdXQ6IFJlYWN0LkZDPFJlYWN0LklucHV0SFRNTEF0dHJpYnV0ZXM8SFRNTElucHV0RWxlbWVudD4gJiB7IGxhYmVsOiBzdHJpbmc7IGVycm9yPzogc3RyaW5nIH0+ID0gKHsgbGFiZWwsIGVycm9yLCAuLi5wcm9wcyB9KSA9PiAoXHJcbiAgPGRpdiBzdHlsZT17eyBtYXJnaW46ICcxMHB4IDAnIH19PlxyXG4gICAgPGxhYmVsPntsYWJlbH08L2xhYmVsPlxyXG4gICAgPGlucHV0IHsuLi5wcm9wc30gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgd2lkdGg6ICcxMDAlJywgcGFkZGluZzogJzVweCcgfX0gLz5cclxuICAgIHtlcnJvciAmJiA8c3BhbiBzdHlsZT17eyBjb2xvcjogJ3JlZCcgfX0+e2Vycm9yfTwvc3Bhbj59XHJcbiAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgU2VsZWN0OiBSZWFjdC5GQzx7XHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgb3B0aW9uczogeyB2YWx1ZTogbnVtYmVyOyBsYWJlbDogc3RyaW5nIH1bXTtcclxuICAgIGVycm9yPzogc3RyaW5nO1xyXG4gICAgdmFsdWU6IG51bWJlciB8IHN0cmluZztcclxuICAgIG9uQ2hhbmdlOiAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxTZWxlY3RFbGVtZW50PikgPT4gdm9pZDtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICB9PiA9ICh7IGxhYmVsLCBvcHRpb25zLCBlcnJvciwgdmFsdWUsIG9uQ2hhbmdlLCBuYW1lLCByZXF1aXJlZCB9KSA9PiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbjogJzEwcHggMCcgfX0+XHJcbiAgICAgIDxsYWJlbD57bGFiZWx9PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdFxyXG4gICAgICAgIG5hbWU9e25hbWV9XHJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCB3aWR0aDogJzEwMCUnLCBwYWRkaW5nOiAnNXB4JyB9fVxyXG4gICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cclxuICAgICAgPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY2Npb25lIHVuYSBvcGNpw7NuPC9vcHRpb24+XHJcbiAgICAgICAge29wdGlvbnMubWFwKG9wdGlvbiA9PiAoXHJcbiAgICAgICAgICA8b3B0aW9uIGtleT17b3B0aW9uLnZhbHVlfSB2YWx1ZT17b3B0aW9uLnZhbHVlfT5cclxuICAgICAgICAgICAge29wdGlvbi5sYWJlbH1cclxuICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgICAge2Vycm9yICYmIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAncmVkJyB9fT57ZXJyb3J9PC9zcGFuPn1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG5leHBvcnQgY29uc3QgTW9kYWw6IFJlYWN0LkZDPHsgaXNPcGVuOiBib29sZWFuOyBvbkNsb3NlOiAoKSA9PiB2b2lkOyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0+ID0gKHsgaXNPcGVuLCBvbkNsb3NlLCBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjUpJyxcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyxcclxuICAgICAgICBvdmVyZmxvdzogJ2F1dG8nLFxyXG4gICAgICAgIHBhZGRpbmc6ICcyMHB4IDAnXHJcbiAgICAgIH19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsXHJcbiAgICAgICAgICBwYWRkaW5nOiAnMjBweCcsXHJcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxyXG4gICAgICAgICAgbWF4V2lkdGg6ICc5MCUnLFxyXG4gICAgICAgICAgbWF4SGVpZ2h0OiAnOTAlJyxcclxuICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsXHJcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xyXG4gICAgICAgIH19PlxyXG4gICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX0gXHJcbiAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgdG9wOiAnMTBweCcsXHJcbiAgICAgICAgICAgICAgcmlnaHQ6ICcxMHB4JyxcclxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcclxuICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICDDl1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogJzIwcHgnIH19PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH07Il0sIm5hbWVzIjpbIlJlYWN0IiwiQnV0dG9uIiwiY2hpbGRyZW4iLCJwcm9wcyIsImJ1dHRvbiIsInN0eWxlIiwicGFkZGluZyIsIm1hcmdpbiIsImN1cnNvciIsIklucHV0IiwibGFiZWwiLCJlcnJvciIsImRpdiIsImlucHV0IiwiZGlzcGxheSIsIndpZHRoIiwic3BhbiIsImNvbG9yIiwiU2VsZWN0Iiwib3B0aW9ucyIsInZhbHVlIiwib25DaGFuZ2UiLCJuYW1lIiwicmVxdWlyZWQiLCJzZWxlY3QiLCJvcHRpb24iLCJtYXAiLCJNb2RhbCIsImlzT3BlbiIsIm9uQ2xvc2UiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwib3ZlcmZsb3ciLCJib3JkZXJSYWRpdXMiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsIm9uQ2xpY2siLCJyaWdodCIsImJvcmRlciIsImZvbnRTaXplIiwibWFyZ2luVG9wIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/ui/UiComponents.tsx\n"));

/***/ })

});