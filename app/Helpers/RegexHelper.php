<?php

namespace App\Helpers;

class RegexHelper {
    const SCRIPT_TAGS_REGEX = '<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>';
    const EVENT_ATTRIBUTES_REGEX = '\bon\w+\s*=\s*["\']([^"\']*)["\']';
    const FUNCTION_REGEX = '(function\s*\w*\s*\([^)]*\)\s*{[\s\S]*?\})|(\b\w+\s*=\s*function\s*\([^)]*\)\s*{[\s\S]*?\})|(\(\s*[^)]*\s*\)\s*=>\s*{[\s\S]*?\})';
    const JAVASCRIPT_REGEX = '<script\b[^<]*(?:(?!<\/script>)<[^<]*)*>([\s\S]*?)<\/script>';
    const CONTAINS_SRC = '<[^>]+src\s*=\s*["\'][^"\']*["\'][^>]*>';
    const IMG_IFRAME_TAG = '<(img|iframe)[^>]*>';
    
    const MERGED_REGEX = '/(' . self::FUNCTION_REGEX . ')|(' . self::EVENT_ATTRIBUTES_REGEX . ')|(' . self::JAVASCRIPT_REGEX . ')|(' . self::CONTAINS_SRC . ')|(' . self::IMG_IFRAME_TAG . ')/i';

}
